const getExamplesV1 = async () => {
  const examples = await prisma.example.findMany();
  return examples;
};

module.exports = getExamplesV1;
