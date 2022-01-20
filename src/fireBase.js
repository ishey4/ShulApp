import { initializeApp } from "firebase/app";

import { firebaseConfig as fireBaseDev } from "./fireBase.dev";
import { firebaseConfig as fireBaseProd } from "./fireBase.prod";

import { parseQueryString } from "./utils/parseQueryString";

const { protocol, host, pathname, search } = window.location

const { env } = parseQueryString({ search })

const envName = env === 'dev' ? 'dev' : 'prod'

const configToUse = envName === 'dev' ? fireBaseDev : fireBaseProd

export const fireBase = initializeApp(configToUse);
export const serviceWorkerPath = `${protocol}//${host}${pathname}/firebase-messaging-sw.${envName}.js`

