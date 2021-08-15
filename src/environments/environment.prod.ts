import { PayPalEnvironment } from 'ngx-paypal';
export const environment = {
  production: true,
  apiURL: 'https://mathapi.pamelalim.me',
  webAuth: {
    clientID: 'bs3jSKz2Ewrye8dD2qRVrD0Tra2tOqHC',
    domain: 'allgiftedllc.au.auth0.com',
    audience: 'https://allgiftedllc.au.auth0.com/userinfo',
    redirectUri: 'http://math.all-gifted.com/home',//http://math.all-gifted.com/home
    theme: {
      logo: "http://school.all-gifted.com/pluginfile.php/1/theme_lambda/logo/1472088488/newlogo.png"
    }
  },
  payPal: {
    payPalEnvironment: PayPalEnvironment.Production,
    productionKey: "AcWwalMgPfGKd-sT_fHGPOf6hAnLc_i8LfhuWlGSl29pd4tR3FWi66FGJt_dI6LPcPvby0yQ1JP4UTK0",
    sandboxKey: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    postEnrollmentUrl: 'http://mathapi.pamelalim.me/enrolments'
  }
};
