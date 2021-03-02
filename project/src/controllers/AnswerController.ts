import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  /*
    http://localhost:3030/answers/8?u=a6e7482d-fd3b-4f24-9473-13e558712c62

    Route Params = Parametros que compõe a rota
    routes.get("/answers/:value")

    Query Params => Busca, paginação. Não obrigatórios
    ?
    chave=valor
    */

  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      return res.status(400).json({
        error: "Survey User does not exists",
      });
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
