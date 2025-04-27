class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // Mongoose query
    this.queryString = queryString; // req.query
  }

  search(fields = []) {
    if (this.queryString.keyword) {
      const keyword = {
        $or: fields.map((field) => ({
          [field]: { $regex: this.queryString.keyword, $options: "i" },
        })),
      };
      this.query = this.query.find(keyword);
    }

    if (this.queryString.role) {
      let roles = this.queryString.role;
      if (!Array.isArray(roles)) {
        roles = roles.split(",");
      }
      this.query = this.query.find({ role: { $in: roles } });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "keyword",
      "sort",
      "page",
      "limit",
      "fields",
      "populate",
      "startDate",
      "endDate",
      "min",
      "max",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  dateRange(field = "createdAt") {
    const { startDate, endDate } = this.queryString;

    if (startDate || endDate) {
      this.query = this.query.find({
        [field]: {
          ...(startDate && { $gte: new Date(startDate) }),
          ...(endDate && { $lte: new Date(endDate) }),
        },
      });
    }

    return this;
  }

  range(field = "price") {
    const { min, max } = this.queryString;
    if (min || max) {
      this.query = this.query.find({
        [field]: {
          ...(min && { $gte: parseFloat(min) }),
          ...(max && { $lte: parseFloat(max) }),
        },
      });
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  populate(populateOptions) {
    if (populateOptions) {
      this.query = this.query.populate(populateOptions);
    }
    return this;
  }
}

export default APIFeatures;
