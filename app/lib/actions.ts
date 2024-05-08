'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

import { SideBarEnum } from '@/app/types/types';
import { ArticleStatus, sentence as Sentence, TagStatus } from '@prisma/client';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function getAllArticle() {
  return prisma.article.findMany();
}

export async function getArticleById(id: number) {
  return prisma.article.findUnique({
    where: {
      id,
    },
  });
}

export async function createArticle(title: string, content: string) {
  const createdArticle = await prisma.article.create({
    data: {
      title,
      content,
    },
  });
  revalidatePath(SideBarEnum.Documents);
  return createdArticle;
}

export async function updateArticleStatus(id: number, status: ArticleStatus) {
  await prisma.article.update({
    where: {
      id,
    },
    data: {
      articleStatus: status,
    },
  });
  revalidatePath(SideBarEnum.Documents);
  redirect(SideBarEnum.Documents);
}

export async function deleteArticle(id: number) {
  const deletedArticle = await prisma.article.delete({
    where: {
      id,
    },
  });
  revalidatePath(SideBarEnum.Documents);
  return deletedArticle;
}

export async function getAllTags() {
  return prisma.tag.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export async function getTagWithColor(color: string) {
  return prisma.tag.findMany({
    where: {
      color,
    },
  });
}

export async function getTagById(id: number) {
  return prisma.tag.findUnique({
    where: {
      id,
    },
  });
}

export async function createTag(name: string, color: string) {
  const createdTag = await prisma.tag.create({
    data: {
      name,
      color,
    },
  });
  revalidatePath(SideBarEnum.Tags);
  return createdTag;
}

export async function editTag(
  id: number,
  data: {
    color: string;
    name: string;
  },
) {
  const editedTag = await prisma.tag.update({
    where: {
      id,
    },
    data,
  });
  revalidatePath(SideBarEnum.Tags);
  return editedTag;
}

export async function deleteTag(id: number) {
  const deletedTag = await prisma.tag.delete({
    where: {
      id,
    },
  });
  revalidatePath(SideBarEnum.Tags);
  return deletedTag;
}

export async function getSentenceTag(
  articleId: number,
  tagId: number,
  sentence: {
    content: string;
    startPosition: number;
    endPosition: number;
  },
) {
  const { startPosition, endPosition, content } = sentence;
  return prisma.sentence.findFirst({
    where: {
      startPosition,
      endPosition,
      articleId,
      tags: {
        some: {
          tagId: tagId,
        },
      },
    },
  });
}

export async function createSentenceTagWithArticleId(
  articleId: number,
  tagId: number,
  sentence: {
    content: string;
    startPosition: number;
    endPosition: number;
  },
): Promise<Sentence> {
  const { content, startPosition, endPosition } = sentence;
  const findOldList = await prisma.sentence.findFirst({
    where: {
      startPosition,
      endPosition,
      articleId,
    },
  });
  let resList;
  if (findOldList) {
    resList = await prisma.sentence.update({
      where: {
        id: findOldList.id,
      },
      data: {
        tags: {
          create: {
            tag: {
              connect: {
                id: tagId,
              },
            },
          },
        },
      },
    });
  } else {
    resList = await prisma.sentence.create({
      data: {
        content,
        startPosition,
        endPosition,
        articleId,
        tags: {
          create: {
            tag: {
              connect: {
                id: tagId,
              },
            },
          },
        },
      },
    });
  }
  return resList;
}

export async function getSentenceAndTagWithArticleId(id: number) {
  return prisma.sentence.findMany({
    where: {
      articleId: id,
    },
    select: {
      content: true,
      startPosition: true,
      endPosition: true,
      tags: {
        select: {
          tag: {
            select: {
              name: true,
              color: true,
            },
          },
          status: true,
        },
      },
    },
  });
}

export async function getAllSentenceTag() {
  return prisma.sentenceTag.findMany({
    select: {
      sentenceId: true,
      tagId: true,
      status: true,
      sentence: {
        select: {
          content: true,
          article: {
            select: {
              title: true,
              id: true,
            },
          },
        },
      },
      tag: {
        select: {
          name: true,
          color: true,
        },
      },
    },
  });
}

export async function updateSentenceTagStatus(
  sentenceId: number,
  tagId: number,
  status: TagStatus,
) {
  const updatedSentenceTag = await prisma.sentenceTag.update({
    where: {
      sentenceTagId: {
        sentenceId,
        tagId,
      },
    },
    data: {
      status,
    },
  });
  revalidatePath(SideBarEnum.ReviewSentence);
  return updatedSentenceTag;
}
