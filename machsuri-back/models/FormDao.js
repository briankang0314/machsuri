const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getQuestions = async (minorId) => {
  return await prisma.questions.findMany({
    where: {
      minorCategoryId: Number(minorId),
    },
    select: {
      id: true,
      description: true,
      questionNumber: true,
      answers: {
        select: {
          id: true,
          answerText: true,
        },
      },
    },
  });
};

const getMinorCategoryId = async (minorId, user_id) => {
  return await prisma.$queryRaw`
  SELECT id FROM applyForm WHERE minorCategoryId = ${minorId} and userId=${user_id}
  and UNIX_TIMESTAMP(endedAt) > UNIX_TIMESTAMP(now());
  `;
};

const postApplication = async (question) => {
  console.log(question.endedAt);
  return await prisma.$queryRaw`
  INSERT INTO applyForm (userId, minorCategoryId, endedAt)
  VALUES
  (${question.userId}, ${question.minor_category_id}, ${question.question_id},${question.choice_question_id},
    DATE_ADD(NOW(), INTERVAL 7 DAY));
`;
};

module.exports = { getQuestions, postQuestion, getMinorCategoryId };
