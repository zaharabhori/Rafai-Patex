// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SeedData } from "src/app/Models/ClientSessionInfo";



export const environment = {
  production: false,
  devUrl: 'http://95.217.73.20:2121/PatexWebApi/api/jwf/',
  LoginBranchRowId:'1001',
  LoginBusAccRowId:"268435457",
  LoginBusDeptRowId:"268435502",
  dataInPacket:["8600000000"],
  
 // data = new SeedData()
 // devUrl: 'http://95.217.73.20:1011/api/jwfApiDataService/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
