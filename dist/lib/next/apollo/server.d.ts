import { ApolloClient } from "@apollo/client";
import { IFetchGQLArgs, IMakeApolloClient } from './index';
export declare function makeApolloClient(args?: IMakeApolloClient): {
    getClient: () => ApolloClient<any>;
};
export declare const fetchGQL: (getClient: Function, args: IFetchGQLArgs) => Promise<any>;
