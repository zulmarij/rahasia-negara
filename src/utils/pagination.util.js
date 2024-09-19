const pagination = (page, limit, count) => {
  const totalPage = Math.ceil(count / limit);
  const hasNextPage = page < totalPage;
  const hasPreviousPage = page > 1;
  const nextPage = hasNextPage ? page + 1 : null;
  const prevPage = hasPreviousPage ? page - 1 : null;

  return {
    total_data: count,
    total_page: totalPage,
    current_page: page,
    next_page: nextPage,
    prev_page: prevPage
  };
};

module.exports = pagination;
