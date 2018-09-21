export class ResultMessage {
    errors:ErrorMessageObj;
    /**Apiden dönen result. */
    result:any;//T dönebilirdik ama Apide herşey T verip T almıyoruz ondan sıkıntı olabilir.
}

export class ErrorMessageObj{
    /**Hata mesajı */
    message:string;
    /**Hata Kodu */
    code:number;
}
