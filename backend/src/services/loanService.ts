
import  {Request , Response} from 'express'

export abstract class LoanService {
  abstract createRequest(req: Request, res: Response): Promise<any>;

  abstract approveRequest(req: Request, res: Response): Promise<any>;
  abstract rejectRequest(req: Request, res: Response): Promise<any>;

  abstract denyloan(req: Request, res: Response): Promise<any>;
  abstract acceptloan(req: Request, res: Response): Promise<any>;
}




