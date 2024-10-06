import Joi from "joi";

export default Joi.object({
  answerText: Joi.string().required().min(2),
  userId: Joi.string().required(),
});
