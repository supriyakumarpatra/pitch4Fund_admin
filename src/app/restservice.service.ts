import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  // BASE_URL = 'https://beta.pitch4fund.com:6051/';
  BASE_URL = 'http://localhost:6051/';
  API_ROOT = this.BASE_URL + 'api/v1/';
  image_URL = this.BASE_URL + 'uploadFiles/images/';
  document_URL = this.BASE_URL + 'uploadFiles/documents/';

  // API_ROOT = 'http://localhost:6051/api/v1/';
  //  PUBLIC_URL = 'http://phloxblog.in:6051/';
  //  image_URL : 'http://phloxblog.in:6051/uploadFiles/images/';
  // document_URL : 'http://phloxblog.in:6051/uploadFiles/documents/';

  constructor(private http: HttpClient) { }

  // INDUSTRY SECTION API START
  getIndustryList(data): any {
      return this.http.post(this.API_ROOT + 'industry/getAllData' , data , httpOptions);
  }
  addIndustry(data): any {
    return this.http.post(this.API_ROOT + 'industry/insertData' , data , httpOptions);
  }
  updateIndustryData(data): any{
    return this.http.post(this.API_ROOT + 'industry/updateData' , data, httpOptions);
  }
  deleteIndustryData(data): any {
    return this.http.post(this.API_ROOT + 'industry/deleteData' , data , httpOptions);
  }


  // INDUSTRY SECTION API END


   // INVESTMENT-STAGE API START
  getInvestmentStageList(data): any {
      return this.http.post(this.API_ROOT + 'investmentstage/getAllData' , data , httpOptions);
  }
  addInvestmentStage(data): any {
    return this.http.post(this.API_ROOT + 'investmentstage/insertData' , data , httpOptions);
  }
  updateInvestmentStageData(data): any{
    return this.http.post(this.API_ROOT + 'investmentstage/updateData' , data, httpOptions);
  }
  deleteInvestmentStageData(data): any {
    return this.http.post(this.API_ROOT + 'investmentstage/deleteData' , data , httpOptions);
  }


  // INVESTMENT-STAGE API END



   // COUNTRY SECTION API START
  getCountryList(data): any {
      return this.http.post(this.API_ROOT + 'country/getAllData' , data , httpOptions);
  }
  addCountry(data): any {
    return this.http.post(this.API_ROOT + 'country/insertData' , data , httpOptions);
  }
  updateCountryData(data): any{
    return this.http.post(this.API_ROOT + 'country/updateData' , data, httpOptions);
  }
  deleteCountryData(data): any {
    return this.http.post(this.API_ROOT + 'country/deleteData' , data , httpOptions);
  }


  // COUNTRY SECTION API END


   // LANGUAGE SECTION API START
  getLanguageList(data): any {
      return this.http.post(this.API_ROOT + 'language/getAllData' , data , httpOptions);
  }
  addLanguage(data): any {
    return this.http.post(this.API_ROOT + 'language/insertData' , data , httpOptions);
  }
  updateLanguageData(data): any{
    return this.http.post(this.API_ROOT + 'language/updateData' , data, httpOptions);
  }
  deleteLanguageData(data): any {
    return this.http.post(this.API_ROOT + 'language/deleteData' , data , httpOptions);
  }


  // LANGUAGE SECTION API END


   // STARTUP VERTICAL SECTION API START
  getStartupVerticalList(data): any {
      return this.http.post(this.API_ROOT + 'startvertical/getAllData' , data , httpOptions);
  }
  addStartupVertical(data): any {
    return this.http.post(this.API_ROOT + 'startvertical/insertData' , data , httpOptions);
  }
  updateStartupVerticalData(data): any{
    return this.http.post(this.API_ROOT + 'startvertical/updateData' , data, httpOptions);
  }
  deleteStartupVerticalData(data): any {
    return this.http.post(this.API_ROOT + 'startvertical/deleteData' , data , httpOptions);
  }


  // STARTUP VERTICAL SECTION API END


   // TIMEZONE SECTION API START
  getTimeZoneList(data): any {
      return this.http.post(this.API_ROOT + 'timezone/getAllData' , data , httpOptions);
  }
  addTimeZone(data): any {
    return this.http.post(this.API_ROOT + 'timezone/insertData' , data , httpOptions);
  }
  updateTimeZoneData(data): any{
    return this.http.post(this.API_ROOT + 'timezone/updateData' , data, httpOptions);
  }
  deleteTimeZoneData(data): any {
    return this.http.post(this.API_ROOT + 'timezone/deleteData' , data , httpOptions);
  }


  // TIMEZONE SECTION API END


   // TREDITIONAL INDUSTRY SECTION API START
  getTreditionalIndustryList(data): any {
      return this.http.post(this.API_ROOT + 'treditionalindustry/getAllData' , data , httpOptions);
  }
  addTreditionalIndustry(data): any {
    return this.http.post(this.API_ROOT + 'treditionalindustry/insertData' , data , httpOptions);
  }
  updateTreditionalIndustryData(data): any{
    return this.http.post(this.API_ROOT + 'treditionalindustry/updateData' , data, httpOptions);
  }
  deleteTreditionalIndustryData(data): any {
    return this.http.post(this.API_ROOT + 'treditionalindustry/deleteData' , data , httpOptions);
  }


  // TREDITIONAL INDUSTRY SECTION API END

  // ENGAGEMENT SECTION API START
getEngagementList(data): any {
  return this.http.post(this.API_ROOT + 'engagement/getAllData' , data , httpOptions);
}

addEngagement(data): any {
  return this.http.post(this.API_ROOT + 'engagement/insertData' , data , httpOptions);
}

updateEngagmentData(data): any{
  return this.http.post(this.API_ROOT + 'engagement/updateData' , data, httpOptions);
}

deleteEngagmentData(data): any {
  return this.http.post(this.API_ROOT + 'engagement/deleteData' , data , httpOptions);
}

   // INVESTOR TYPE SECTION API START
  getInvestorTypeList(data): any {
      return this.http.post(this.API_ROOT + 'investorType/getAllData' , data , httpOptions);
  }
  addInvestorType(data): any {
    return this.http.post(this.API_ROOT + 'investorType/insertData' , data , httpOptions);
  }
  updateInvestorTypeData(data): any{
    return this.http.post(this.API_ROOT + 'investorType/updateData' , data, httpOptions);
  }
  deleteInvestorTypeData(data): any {
    return this.http.post(this.API_ROOT + 'investorType/deleteData' , data , httpOptions);
  }


  // INVESTOR TYPE SECTION API END




 // USER TYPE SECTION API START

 getAllInvestor(data): Observable<any> {
   return this.http.post(this.API_ROOT + 'user/getAllInvestorData', data, httpOptions);
 }

 changeUserStatus(data): Observable<any> {
  return this.http.post(this.API_ROOT + 'user/changeUserStatus', data, httpOptions);
 }
  allCompanyDocument(data): Observable<any> {
    return this.http.post(this.API_ROOT + 'user/getAllInvestorDocument', data, httpOptions);
  }

  getAllStartup(data): Observable<any> {
    return this.http.post(this.API_ROOT + 'user/getAllStartupData', data, httpOptions);
  }

  getStartupPresentationVideo(data): Observable<any> {
    return this.http.post(this.API_ROOT + 'user/presentationVideo', data, httpOptions);
  }

  allStartupDocument(data): Observable<any> {
    return this.http.post(this.API_ROOT + 'user/getStartupRelatedDocument', data, httpOptions);
  }

  changeStartupStatus(data): Observable<any> {
    return this.http.post(this.API_ROOT + 'user/changeStartupStatus', data, httpOptions);
   }

   uploadFile(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'uploadFiles', data );
  }

  uploadVideo(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'startup/savepesentationvideo', data, httpOptions);
  }

}

