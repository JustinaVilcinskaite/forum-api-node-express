import Joi from "joi";

export default Joi.object({
  questionTitle: Joi.string().required().min(5).max(50),
  questionText: Joi.string().required().min(20),
  userId: Joi.string().required(),
});
