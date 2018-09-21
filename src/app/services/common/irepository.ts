import { Observable } from 'rxjs';
import { ResultMessage } from '../../models/result-message';

export interface IRepository  { // <T extends BaseModel> şeklinde tanımlama yapılabilir.
   /**Apiye Get isteği atar ve döner. */
    getAll<T>(): Observable<T>;
    /**Verilen modeli post ile Apiye gönderir. */
    insert<T>(model:T): Observable<ResultMessage>;
    /**Verilen modeli put ile apiye yönlendirir. */
    update<T>(model:T): Observable<ResultMessage>;
    /**Verilen id'yi delete ile apiye yönlendirir. */
    delete<T>(id:number):Observable<ResultMessage>;
}
