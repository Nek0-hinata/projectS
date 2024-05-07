'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import prisma from '@/app/lib/prisma';
import { faker } from '@faker-js/faker';
import { revalidatePath } from 'next/cache';

import { SideBarEnum } from '@/app/types/types';
import { sentence as Sentence } from '@prisma/client';

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

export async function updateWhenSignOut(id: string) {
  const now = new Date();
  const curInternetDetail = await prisma.internetDetail.findUnique({
    where: {
      id,
    },
    select: {
      signInTime: true,
    },
  });
  if (curInternetDetail) {
    const signInTime = new Date(curInternetDetail.signInTime);
    const duration = now.getTime() - signInTime.getTime();
    await prisma.internetDetail.update({
      where: {
        id,
      },
      data: {
        signOutTime: now.toISOString(),
        duration,
        currentTraffic: duration * faker.number.int({ min: 5, max: 25 }),
      },
    });
  }
}

export type BillingValueType = {
  endDate: string;
  totalTraffic: number;
  product: string;
};

export async function createBillingStatementByUserEmail(
  email: string,
  billingValue: BillingValueType,
) {
  return prisma.users.update({
    where: {
      email,
    },
    data: {
      billingStatements: {
        create: {
          totalTraffic: billingValue.totalTraffic,
          product: billingValue.product,
          billingTime: billingValue.endDate,
          totalOnlineTime: 0,
        },
      },
    },
  });
}

export async function getBillingStatement(value: BillingValueType) {
  return prisma.billingStatement.findMany({
    where: {
      billingTime: value.endDate,
    },
  });
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
  return prisma.tag.findMany();
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

export async function createOrGetSentenceWithArticleId(
  articleId: number,
  sentence: {
    content: string;
    startPosition: number;
    endPosition: number;
  },
): Promise<Sentence> {
  const { content, startPosition, endPosition } = sentence;
  const sentenceList = await prisma.sentence.findFirst({
    where: {
      startPosition,
      endPosition,
      articleId,
    },
  });

  if (sentenceList) {
    return sentenceList;
  } else {
    return prisma.sentence.create({
      data: {
        content,
        startPosition,
        endPosition,
        articleId,
      },
    });
  }
}

export async function createSentenceTag(sentenceId: number, tagId: number) {
  return prisma.sentenceTag.create({
    data: {
      sentenceId,
      tagId,
    },
  });
}
