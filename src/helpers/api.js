export class Api {
  static Base = class {
    //static get URL() { return 'https://cshasar.somposigorta.com.tr/sigorta' }
    static get URL() { return window.location.origin + '/sigorta' }
    //static get URL() { return 'http://localhost:8080/sigorta' }
    static get ServiceURL() { return this.URL + '/dispatch' }
    static get AppealURL() { return 'https://cshasar.somposigorta.com.tr/side/ihalefirmabasvuru.jsp' }
  }

  static Tender = class {
    static get GET_VEHICLE_DETAIL() {
      return "getPertPortalAracDetay"
    }
    static get GET_TENDER_GIVE_OFFER_VIEW() {
      return "getIhaleTeklifVerView"
    }
    static get EXECUTE_GIVE_OFFER() {
      return "executeTeklifVer"
    }
  }

  static Message = class {
    static get LIST_MESSAGES() {
      return "listKullaniciMesajBaslik"
    }
    static get SEND_MESSAGE() {
      return "createPertBilgiTalep"
    }
    static get CHECK_AS_SEEN() {
      return "executeGorulduOlarakIsaretle"
    }
    static get GET_UNREAD_MESSAGE_COUNT() {
      return "getOkunmamisMesajCount"
    }
    static get GET_RELATIONAL_VEHICLE() {
      return "getIliskiliDosyaArac"
    }
  }

  static Common = class {
    static get GENERIC_CREATE_OR_UPDATE_URL() {
      return "genericCreateOrUpdate"
    }
    static get GENERIC_LIST_URL() {
      return "genericList"
    }
    static get GENERIC_DELETE_URL() {
      return "genericDelete"
    }
    static get LIST_CITY_VIEWS_URL() {
      return "listCityViews"
    }
    static get LIST_UI_FORM_URL() {
      return "getUiFormList"
    }
    static get LIST_CACHE_URL() {
      return "GET_CACHABLE_RF_DATA_INFO"
    }
  }
  static Claim = class {
    static get GET_CLAIM_DETAIL() {
      return "getOtoDisiDisEksperDetay"
    }
    static get REJECT_CLAIM() {
      return "executeOtoDisiDisEksperAkisSonlandir"
    }
    static get LIST_OUTSTANDING_INDEMNITEE_URL() {
      return "listMuallakTazminatAlacakliComboKisi"
    }
    static get UPLOAD_FILE_URL() {
      return "executeEvrakYukleFromExternal"
    }
    static get LIST_LOADED_URL() {
      return "listYuklenmisHasarDosyaEvraklarByJson"
    }
    static get LIST_NOT_LOADED_URL() {
      return "listYuklenmemisHasarDosyaEvraklarByJson"
    }
    static get SAVE_FORM_CONTROL_URL() {
      return "saveOtoDisiDisEksperKontrol"
    }
    static get LIST_PREVIOUS_CLAIM_URL() {
      return "listHasarOncekiDosya"
    }
    static get SAVE_EXPERT_REPORT_URL() {
      return "saveOtoDisiDisEksperRapor"
    }
  }
  static Appointment = class {
    static get SAVE_APPOINTMENT_URL() {
      return "saveOtoDisiDisEksperRandevuPlanlama"
    }
    static get DELETE_APPOINTMENT_URL() {
      return "deleteOtoDisiDisEksperRandevuPlanlama"
    }
    static get LIST_APPOINTMENT_URL() {
      return "listOtoDisiDisEksperRandevuPlanlama"
    }
    static get LIST_APPOINTMENT_UNCONFIRMED_URL() {
      return "listOtoDisiDisEksperRandevuOnay"
    }
    static get EXECUTE_APPOINTMENT_CONFIRM_URL() {
      return "executeOtoDisiDisEksperRandevuOnayla"
    }
  }
  static Asset = class {
    static get SAVE_ASSET_URL() {
      return ""
    }
    static get DELETE_ASSET_URL() {
      return ""
    }
    static get LIST_ASSET_URL() {
      return ""
    }
  }
  static Packages = class {
    static get CLAIM_EXPERT() {
      return "com.cs.sigorta.model.hasar.eksper.DosyaEksper"
    }
    static get NON_AUTO_APPOINMENT_PLAN() {
      return "com.cs.sigorta.model.hasar.otodisi.OtoDisiDisEksperRandevuPlanlama"
    }
    static get CLAIM_ASSET() {
      return "com.cs.sigorta.model.hasar.otodisi.OtoDisiDisEksperKiymet"
    }
    static get CLAIM_ASSET_DETAIL() {
      return "com.cs.sigorta.model.hasar.otodisi.OtoDisiDisEksperKiymetDetay"
    }
    static get OPINION_REPORT() {
      return "com.cs.sigorta.model.hasar.otodisi.OtoDisiDisEksperRaporKanaat"
    }
    static get CONTROL() {
      return "com.cs.sigorta.model.hasar.otodisi.OtoDisiDisEksperKontrol"
    }
    static get COMPLEX() {
      return "com.cs.sigorta.model.hasar.otodisi.OtoDisiDisEksperKompleks"
    }
    static get REPORT_INFO() {
      return "com.cs.sigorta.model.hasar.otodisi.OtoDisiDisEksperRaporBilgi"
    }

  }
}
