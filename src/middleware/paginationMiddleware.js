

function paginationMiddleware(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
  
    req.pagination = {
      page,
      limit,
      offset
    };
  
    next();
  }
  
  module.exports = paginationMiddleware;