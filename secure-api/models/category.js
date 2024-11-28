const categModel = (body) => {
  let model = {
    name: body.categName,
  };

  return model;
};

const servModel = (body) => {
  let model = {
    CategoryId: body.catId,
    ServiceName: body.servName,
    Type: body.servType,
    Price: body.prId,
    //  CreatedAt : new Date(),
    //  UpdatedAt : new Date()
  };

  return model;
};

module.exports = { servModel, categModel };
