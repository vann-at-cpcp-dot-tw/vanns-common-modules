import { ApolloLink } from "@apollo/client"

export const REVALIDATE = Number(process.env.NEXT_PUBLIC_REVALIDATE || 60)

export interface IFetchGQLArgs {
  variables?: {
    [key:string]: any;
  }
  context?:{
    [key:string]: any;
  }
}

export interface IMakeApolloClient {
  uri: string;
  context?: any;
  revalidate?: number;
  memoryCacheOptions?: {[key:string]:any};
  middlewares?: ApolloLink[];
}