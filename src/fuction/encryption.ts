import CryptoJS from "crypto-js";

export class Encryption {
  static encrypt(value: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      "CentraVAS1234!"
    ).toString();
  }

  static decrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, "CentraVAS1234!").toString(
      CryptoJS.enc.Utf8
    );
  }
}
