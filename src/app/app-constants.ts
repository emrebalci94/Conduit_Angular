//Buraya sabitlerimizi tanımlıcaz.
export class AppConstants {
    /**Apinin hostunu döner.Örnek:http//localhost */
    public static ServerUrl = "http://192.168.1.57/";
    /**Sadece url'in api ile olan bağlantısını döner. Örnek:.../api/ */
    public static ApiUrl = "api/";
    /*** Bu size ApiUrlin base tabanını döndürür.Örnek:http://localhost/api/ */
    public static ServerWithApiUrl = AppConstants.ServerUrl + AppConstants.ApiUrl;
}
