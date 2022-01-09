import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Business = {
  __typename?: 'Business';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  employees?: Maybe<Array<Worker>>;
  id: Scalars['ID'];
  invite_code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  profile_picture?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  type?: Maybe<BusinessType>;
};

export type BusinessType = {
  __typename?: 'BusinessType';
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreatePositionInput = {
  color: Scalars['String'];
  position_name: Scalars['String'];
};

export type CreateShiftInput = {
  address?: Maybe<Scalars['String']>;
  /** unix timestamp */
  end_time: Scalars['Int'];
  /** Notes that the workers should know about. */
  notes?: Maybe<Scalars['String']>;
  position_id: Scalars['String'];
  rate: Scalars['Int'];
  /** unix timestamp */
  start_time: Scalars['Int'];
  /** An array of worker ids ex: [uui2u30-dsdsd, ioi93io34-sdsodi9] */
  worker_ids?: Maybe<Array<Scalars['String']>>;
};

export type InviteWorkerInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  position_id: Scalars['String'];
};

export type InviteWorkerToShiftInput = {
  shift_id: Scalars['String'];
  worker_id: Scalars['String'];
};

export type ListShiftsInput = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  /** Provide a position id if you want shifts for a given position. */
  position_id?: Maybe<Scalars['String']>;
  work_day_id: Scalars['String'];
};

export type ListWorkersInput = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  position_id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Use this endpoint to create a new worker position. */
  businessCreatePosition: WorkerPosition;
  /** Use this endpoint to create a shift. */
  businessCreateShift: Shift;
  /** Use this endpoint to create a work day. If a workday exists already, it will be returned. */
  businessCreateWorkDay: WorkDay;
  /** Use this endpoint to delete a given worker position. */
  businessDeletePosition: WorkerPosition;
  /** This endpoint is used to delete a shift. */
  businessDeleteShift: Shift;
  /** A business can use this endpoint to invite workers to the platform. It will send them a url with a unique invite code that can be used to sign up for the platform. */
  businessInviteWorkerToApp: Worker;
  /** Use this endpoint to invite a worker to a shift. */
  businessInviteWorkerToShift: ShiftInvite;
  /** Use this endpoint to un-invite a worker. */
  businessUnInviteWorkerToShift: ShiftInvite;
  /** Use this endpoint to update a given worker position. */
  businessUpdatePosition: WorkerPosition;
  businessUpdateProfilePicture: Scalars['Boolean'];
  /** Updates a shift, send all workers regardless. */
  businessUpdateShift: Shift;
  /** Update your business information */
  updateBusiness: Business;
  updateWorker: Worker;
};


export type MutationBusinessCreatePositionArgs = {
  input: CreatePositionInput;
};


export type MutationBusinessCreateShiftArgs = {
  input: CreateShiftInput;
};


export type MutationBusinessCreateWorkDayArgs = {
  for: Scalars['Int'];
};


export type MutationBusinessDeletePositionArgs = {
  position_id: Scalars['String'];
};


export type MutationBusinessDeleteShiftArgs = {
  shift_id: Scalars['String'];
};


export type MutationBusinessInviteWorkerToAppArgs = {
  input: InviteWorkerInput;
};


export type MutationBusinessInviteWorkerToShiftArgs = {
  input: InviteWorkerToShiftInput;
};


export type MutationBusinessUnInviteWorkerToShiftArgs = {
  input: UnInviteWorkerToShiftInput;
};


export type MutationBusinessUpdatePositionArgs = {
  input: UpdatePositionInput;
};


export type MutationBusinessUpdateProfilePictureArgs = {
  file: Scalars['Upload'];
};


export type MutationBusinessUpdateShiftArgs = {
  input: UpdateShiftInput;
};


export type MutationUpdateBusinessArgs = {
  business: UpdateBusinessInput;
};


export type MutationUpdateWorkerArgs = {
  worker: UpdateWorkerInput;
};

export type Query = {
  __typename?: 'Query';
  /** Lists all of the shifts on a given workday. */
  businessListShifts: Array<Shift>;
  /** Get all available positions that can be assigned to a worker. */
  businessListWorkerPositions: Array<WorkerPosition>;
  /** Fetches all workers, use position id to filter by position. Supports pagination via limit and offset. */
  businessListWorkers: Array<Worker>;
  /** Retrieve a WorkerPosition by id */
  businessRetrievePosition: WorkerPosition;
  /** Lists all of the shifts on a given workday. */
  businessRetrieveShift: Shift;
  /** Use this endpoint to retrieve a work day that overlaps with the given unix timestamp. If no workday exists, the return value will be null */
  businessRetrieveWorkDay?: Maybe<WorkDay>;
  /** Given an invite code, it will retrieve the business information that is related to it. If no such business is found, it will respond with an error. */
  checkInviteCode: Business;
  /** List all business types */
  listBusinessType: Array<BusinessType>;
  /** Retrieve the current user business */
  retrieveBusiness: Business;
  worker?: Maybe<Worker>;
};


export type QueryBusinessListShiftsArgs = {
  input: ListShiftsInput;
};


export type QueryBusinessListWorkersArgs = {
  input: ListWorkersInput;
};


export type QueryBusinessRetrievePositionArgs = {
  id: Scalars['String'];
};


export type QueryBusinessRetrieveShiftArgs = {
  id: Scalars['String'];
};


export type QueryBusinessRetrieveWorkDayArgs = {
  for: Scalars['Int'];
};


export type QueryCheckInviteCodeArgs = {
  code: Scalars['String'];
};

export type Shift = {
  __typename?: 'Shift';
  address?: Maybe<Scalars['String']>;
  day: WorkDay;
  /** Unix timestamp. */
  end_time: Scalars['Int'];
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  position: WorkerPosition;
  rate: Scalars['Float'];
  shiftInvites?: Maybe<Array<ShiftInvite>>;
  /** Unix timestamp */
  start_time: Scalars['Int'];
};

export type ShiftInvite = {
  __typename?: 'ShiftInvite';
  id: Scalars['ID'];
  invited?: Maybe<Scalars['Boolean']>;
  shift: Shift;
  worker: Worker;
};

export type UnInviteWorkerToShiftInput = {
  shift_invite_id: Scalars['String'];
  worker_id: Scalars['String'];
};

export type UpdateBusinessInput = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  /** id of the business type */
  type_id?: Maybe<Scalars['String']>;
};

export type UpdatePositionInput = {
  color?: Maybe<Scalars['String']>;
  position_id: Scalars['String'];
  position_name?: Maybe<Scalars['String']>;
};

export type UpdateShiftInput = {
  address?: Maybe<Scalars['String']>;
  /** unix timestamp */
  end_time?: Maybe<Scalars['Int']>;
  /** Notes that the workers should know about. */
  notes?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Int']>;
  shift_id: Scalars['String'];
  /** unix timestamp */
  start_time?: Maybe<Scalars['Int']>;
  /** String that contains the ids of all the workers, if they are omitted, that means that they have been uninvited from the shift. */
  worker_ids: Array<Scalars['String']>;
};

export type UpdateWorkerInput = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type WorkDay = {
  __typename?: 'WorkDay';
  creator: Business;
  /** Represented as a unix timestamp */
  date: Scalars['Int'];
  id: Scalars['ID'];
  shifts?: Maybe<Array<Shift>>;
};

export type Worker = {
  __typename?: 'Worker';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  country?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  employer?: Maybe<Business>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invitation_code?: Maybe<Scalars['String']>;
  invited?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  position?: Maybe<WorkerPosition>;
  postal?: Maybe<Scalars['String']>;
  profile_picture?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type WorkerPosition = {
  __typename?: 'WorkerPosition';
  active: Scalars['Boolean'];
  color: Scalars['String'];
  creator?: Maybe<Business>;
  id: Scalars['ID'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  rank: Scalars['Int'];
};

export type BusinessCreatePositionMutationVariables = Exact<{
  input: CreatePositionInput;
}>;


export type BusinessCreatePositionMutation = { __typename?: 'Mutation', businessCreatePosition: { __typename?: 'WorkerPosition', id: string, name: string, color: string } };

export type BusinessCreateShiftMutationVariables = Exact<{
  input: CreateShiftInput;
}>;


export type BusinessCreateShiftMutation = { __typename?: 'Mutation', businessCreateShift: { __typename?: 'Shift', id: string } };

export type BusinessInviteWorkerToAppMutationVariables = Exact<{
  i: InviteWorkerInput;
}>;


export type BusinessInviteWorkerToAppMutation = { __typename?: 'Mutation', businessInviteWorkerToApp: { __typename?: 'Worker', id: string, first_name?: string | null | undefined, last_name?: string | null | undefined, email: string, position?: { __typename?: 'WorkerPosition', id: string, name: string } | null | undefined } };

export type BusinessUpdateShiftMutationVariables = Exact<{
  input: UpdateShiftInput;
}>;


export type BusinessUpdateShiftMutation = { __typename?: 'Mutation', businessUpdateShift: { __typename?: 'Shift', id: string, start_time: number, end_time: number, day: { __typename?: 'WorkDay', id: string } } };

export type UpdateBusinessMutationVariables = Exact<{
  input: UpdateBusinessInput;
}>;


export type UpdateBusinessMutation = { __typename?: 'Mutation', updateBusiness: { __typename?: 'Business', id: string, email: string, name?: string | null | undefined } };

export type UpdateBusinessPictureMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UpdateBusinessPictureMutation = { __typename?: 'Mutation', businessUpdateProfilePicture: boolean };

export type BusinessListWorkersQueryVariables = Exact<{
  i: ListWorkersInput;
}>;


export type BusinessListWorkersQuery = { __typename?: 'Query', businessListWorkers: Array<{ __typename?: 'Worker', id: string, first_name?: string | null | undefined, last_name?: string | null | undefined, email: string, confirmed?: boolean | null | undefined, profile_picture?: string | null | undefined, invited?: boolean | null | undefined, position?: { __typename?: 'WorkerPosition', id: string, name: string, color: string } | null | undefined }> };

export type BusinessRetrieveShiftQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type BusinessRetrieveShiftQuery = { __typename?: 'Query', businessRetrieveShift: { __typename?: 'Shift', id: string, start_time: number, end_time: number, notes?: string | null | undefined, rate: number, address?: string | null | undefined, day: { __typename?: 'WorkDay', id: string, date: number }, position: { __typename?: 'WorkerPosition', id: string, name: string, color: string }, shiftInvites?: Array<{ __typename?: 'ShiftInvite', id: string, worker: { __typename?: 'Worker', id: string, first_name?: string | null | undefined, last_name?: string | null | undefined, profile_picture?: string | null | undefined } }> | null | undefined } };

export type ListBusinessTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBusinessTypeQuery = { __typename?: 'Query', listBusinessType: Array<{ __typename?: 'BusinessType', id: string, name: string }> };

export type ListWorkerPositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListWorkerPositionsQuery = { __typename?: 'Query', businessListWorkerPositions: Array<{ __typename?: 'WorkerPosition', id: string, name: string, rank: number, color: string, public: boolean }> };

export type BusinessProfileQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type BusinessProfileQueryQuery = { __typename?: 'Query', retrieveBusiness: { __typename?: 'Business', id: string, email: string, profile_picture?: string | null | undefined, city?: string | null | undefined, address?: string | null | undefined } };


export const BusinessCreatePositionDocument = gql`
    mutation businessCreatePosition($input: CreatePositionInput!) {
  businessCreatePosition(input: $input) {
    id
    name
    color
  }
}
    `;
export type BusinessCreatePositionMutationFn = Apollo.MutationFunction<BusinessCreatePositionMutation, BusinessCreatePositionMutationVariables>;

/**
 * __useBusinessCreatePositionMutation__
 *
 * To run a mutation, you first call `useBusinessCreatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBusinessCreatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [businessCreatePositionMutation, { data, loading, error }] = useBusinessCreatePositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBusinessCreatePositionMutation(baseOptions?: Apollo.MutationHookOptions<BusinessCreatePositionMutation, BusinessCreatePositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BusinessCreatePositionMutation, BusinessCreatePositionMutationVariables>(BusinessCreatePositionDocument, options);
      }
export type BusinessCreatePositionMutationHookResult = ReturnType<typeof useBusinessCreatePositionMutation>;
export type BusinessCreatePositionMutationResult = Apollo.MutationResult<BusinessCreatePositionMutation>;
export type BusinessCreatePositionMutationOptions = Apollo.BaseMutationOptions<BusinessCreatePositionMutation, BusinessCreatePositionMutationVariables>;
export const BusinessCreateShiftDocument = gql`
    mutation businessCreateShift($input: CreateShiftInput!) {
  businessCreateShift(input: $input) {
    id
  }
}
    `;
export type BusinessCreateShiftMutationFn = Apollo.MutationFunction<BusinessCreateShiftMutation, BusinessCreateShiftMutationVariables>;

/**
 * __useBusinessCreateShiftMutation__
 *
 * To run a mutation, you first call `useBusinessCreateShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBusinessCreateShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [businessCreateShiftMutation, { data, loading, error }] = useBusinessCreateShiftMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBusinessCreateShiftMutation(baseOptions?: Apollo.MutationHookOptions<BusinessCreateShiftMutation, BusinessCreateShiftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BusinessCreateShiftMutation, BusinessCreateShiftMutationVariables>(BusinessCreateShiftDocument, options);
      }
export type BusinessCreateShiftMutationHookResult = ReturnType<typeof useBusinessCreateShiftMutation>;
export type BusinessCreateShiftMutationResult = Apollo.MutationResult<BusinessCreateShiftMutation>;
export type BusinessCreateShiftMutationOptions = Apollo.BaseMutationOptions<BusinessCreateShiftMutation, BusinessCreateShiftMutationVariables>;
export const BusinessInviteWorkerToAppDocument = gql`
    mutation businessInviteWorkerToApp($i: InviteWorkerInput!) {
  businessInviteWorkerToApp(input: $i) {
    id
    first_name
    last_name
    email
    position {
      id
      name
    }
  }
}
    `;
export type BusinessInviteWorkerToAppMutationFn = Apollo.MutationFunction<BusinessInviteWorkerToAppMutation, BusinessInviteWorkerToAppMutationVariables>;

/**
 * __useBusinessInviteWorkerToAppMutation__
 *
 * To run a mutation, you first call `useBusinessInviteWorkerToAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBusinessInviteWorkerToAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [businessInviteWorkerToAppMutation, { data, loading, error }] = useBusinessInviteWorkerToAppMutation({
 *   variables: {
 *      i: // value for 'i'
 *   },
 * });
 */
export function useBusinessInviteWorkerToAppMutation(baseOptions?: Apollo.MutationHookOptions<BusinessInviteWorkerToAppMutation, BusinessInviteWorkerToAppMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BusinessInviteWorkerToAppMutation, BusinessInviteWorkerToAppMutationVariables>(BusinessInviteWorkerToAppDocument, options);
      }
export type BusinessInviteWorkerToAppMutationHookResult = ReturnType<typeof useBusinessInviteWorkerToAppMutation>;
export type BusinessInviteWorkerToAppMutationResult = Apollo.MutationResult<BusinessInviteWorkerToAppMutation>;
export type BusinessInviteWorkerToAppMutationOptions = Apollo.BaseMutationOptions<BusinessInviteWorkerToAppMutation, BusinessInviteWorkerToAppMutationVariables>;
export const BusinessUpdateShiftDocument = gql`
    mutation businessUpdateShift($input: UpdateShiftInput!) {
  businessUpdateShift(input: $input) {
    id
    day {
      id
    }
    start_time
    end_time
  }
}
    `;
export type BusinessUpdateShiftMutationFn = Apollo.MutationFunction<BusinessUpdateShiftMutation, BusinessUpdateShiftMutationVariables>;

/**
 * __useBusinessUpdateShiftMutation__
 *
 * To run a mutation, you first call `useBusinessUpdateShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBusinessUpdateShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [businessUpdateShiftMutation, { data, loading, error }] = useBusinessUpdateShiftMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBusinessUpdateShiftMutation(baseOptions?: Apollo.MutationHookOptions<BusinessUpdateShiftMutation, BusinessUpdateShiftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BusinessUpdateShiftMutation, BusinessUpdateShiftMutationVariables>(BusinessUpdateShiftDocument, options);
      }
export type BusinessUpdateShiftMutationHookResult = ReturnType<typeof useBusinessUpdateShiftMutation>;
export type BusinessUpdateShiftMutationResult = Apollo.MutationResult<BusinessUpdateShiftMutation>;
export type BusinessUpdateShiftMutationOptions = Apollo.BaseMutationOptions<BusinessUpdateShiftMutation, BusinessUpdateShiftMutationVariables>;
export const UpdateBusinessDocument = gql`
    mutation updateBusiness($input: UpdateBusinessInput!) {
  updateBusiness(business: $input) {
    id
    email
    name
  }
}
    `;
export type UpdateBusinessMutationFn = Apollo.MutationFunction<UpdateBusinessMutation, UpdateBusinessMutationVariables>;

/**
 * __useUpdateBusinessMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessMutation, { data, loading, error }] = useUpdateBusinessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessMutation, UpdateBusinessMutationVariables>(UpdateBusinessDocument, options);
      }
export type UpdateBusinessMutationHookResult = ReturnType<typeof useUpdateBusinessMutation>;
export type UpdateBusinessMutationResult = Apollo.MutationResult<UpdateBusinessMutation>;
export type UpdateBusinessMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>;
export const UpdateBusinessPictureDocument = gql`
    mutation updateBusinessPicture($file: Upload!) {
  businessUpdateProfilePicture(file: $file)
}
    `;
export type UpdateBusinessPictureMutationFn = Apollo.MutationFunction<UpdateBusinessPictureMutation, UpdateBusinessPictureMutationVariables>;

/**
 * __useUpdateBusinessPictureMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessPictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessPictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessPictureMutation, { data, loading, error }] = useUpdateBusinessPictureMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUpdateBusinessPictureMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessPictureMutation, UpdateBusinessPictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessPictureMutation, UpdateBusinessPictureMutationVariables>(UpdateBusinessPictureDocument, options);
      }
export type UpdateBusinessPictureMutationHookResult = ReturnType<typeof useUpdateBusinessPictureMutation>;
export type UpdateBusinessPictureMutationResult = Apollo.MutationResult<UpdateBusinessPictureMutation>;
export type UpdateBusinessPictureMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessPictureMutation, UpdateBusinessPictureMutationVariables>;
export const BusinessListWorkersDocument = gql`
    query businessListWorkers($i: ListWorkersInput!) {
  businessListWorkers(input: $i) {
    id
    first_name
    last_name
    position {
      id
      name
      color
    }
    email
    confirmed
    profile_picture
    invited
  }
}
    `;

/**
 * __useBusinessListWorkersQuery__
 *
 * To run a query within a React component, call `useBusinessListWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessListWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessListWorkersQuery({
 *   variables: {
 *      i: // value for 'i'
 *   },
 * });
 */
export function useBusinessListWorkersQuery(baseOptions: Apollo.QueryHookOptions<BusinessListWorkersQuery, BusinessListWorkersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessListWorkersQuery, BusinessListWorkersQueryVariables>(BusinessListWorkersDocument, options);
      }
export function useBusinessListWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessListWorkersQuery, BusinessListWorkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessListWorkersQuery, BusinessListWorkersQueryVariables>(BusinessListWorkersDocument, options);
        }
export type BusinessListWorkersQueryHookResult = ReturnType<typeof useBusinessListWorkersQuery>;
export type BusinessListWorkersLazyQueryHookResult = ReturnType<typeof useBusinessListWorkersLazyQuery>;
export type BusinessListWorkersQueryResult = Apollo.QueryResult<BusinessListWorkersQuery, BusinessListWorkersQueryVariables>;
export const BusinessRetrieveShiftDocument = gql`
    query businessRetrieveShift($id: String!) {
  businessRetrieveShift(id: $id) {
    id
    day {
      id
      date
    }
    position {
      id
      name
      color
    }
    start_time
    end_time
    shiftInvites {
      id
      worker {
        id
        first_name
        last_name
        profile_picture
      }
    }
    notes
    rate
    address
  }
}
    `;

/**
 * __useBusinessRetrieveShiftQuery__
 *
 * To run a query within a React component, call `useBusinessRetrieveShiftQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessRetrieveShiftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessRetrieveShiftQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBusinessRetrieveShiftQuery(baseOptions: Apollo.QueryHookOptions<BusinessRetrieveShiftQuery, BusinessRetrieveShiftQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessRetrieveShiftQuery, BusinessRetrieveShiftQueryVariables>(BusinessRetrieveShiftDocument, options);
      }
export function useBusinessRetrieveShiftLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessRetrieveShiftQuery, BusinessRetrieveShiftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessRetrieveShiftQuery, BusinessRetrieveShiftQueryVariables>(BusinessRetrieveShiftDocument, options);
        }
export type BusinessRetrieveShiftQueryHookResult = ReturnType<typeof useBusinessRetrieveShiftQuery>;
export type BusinessRetrieveShiftLazyQueryHookResult = ReturnType<typeof useBusinessRetrieveShiftLazyQuery>;
export type BusinessRetrieveShiftQueryResult = Apollo.QueryResult<BusinessRetrieveShiftQuery, BusinessRetrieveShiftQueryVariables>;
export const ListBusinessTypeDocument = gql`
    query listBusinessType {
  listBusinessType {
    id
    name
  }
}
    `;

/**
 * __useListBusinessTypeQuery__
 *
 * To run a query within a React component, call `useListBusinessTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBusinessTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBusinessTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useListBusinessTypeQuery(baseOptions?: Apollo.QueryHookOptions<ListBusinessTypeQuery, ListBusinessTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBusinessTypeQuery, ListBusinessTypeQueryVariables>(ListBusinessTypeDocument, options);
      }
export function useListBusinessTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBusinessTypeQuery, ListBusinessTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBusinessTypeQuery, ListBusinessTypeQueryVariables>(ListBusinessTypeDocument, options);
        }
export type ListBusinessTypeQueryHookResult = ReturnType<typeof useListBusinessTypeQuery>;
export type ListBusinessTypeLazyQueryHookResult = ReturnType<typeof useListBusinessTypeLazyQuery>;
export type ListBusinessTypeQueryResult = Apollo.QueryResult<ListBusinessTypeQuery, ListBusinessTypeQueryVariables>;
export const ListWorkerPositionsDocument = gql`
    query listWorkerPositions {
  businessListWorkerPositions {
    id
    name
    rank
    color
    public
  }
}
    `;

/**
 * __useListWorkerPositionsQuery__
 *
 * To run a query within a React component, call `useListWorkerPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListWorkerPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListWorkerPositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListWorkerPositionsQuery(baseOptions?: Apollo.QueryHookOptions<ListWorkerPositionsQuery, ListWorkerPositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListWorkerPositionsQuery, ListWorkerPositionsQueryVariables>(ListWorkerPositionsDocument, options);
      }
export function useListWorkerPositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListWorkerPositionsQuery, ListWorkerPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListWorkerPositionsQuery, ListWorkerPositionsQueryVariables>(ListWorkerPositionsDocument, options);
        }
export type ListWorkerPositionsQueryHookResult = ReturnType<typeof useListWorkerPositionsQuery>;
export type ListWorkerPositionsLazyQueryHookResult = ReturnType<typeof useListWorkerPositionsLazyQuery>;
export type ListWorkerPositionsQueryResult = Apollo.QueryResult<ListWorkerPositionsQuery, ListWorkerPositionsQueryVariables>;
export const BusinessProfileQueryDocument = gql`
    query BusinessProfileQuery {
  retrieveBusiness {
    id
    email
    profile_picture
    city
    address
  }
}
    `;

/**
 * __useBusinessProfileQueryQuery__
 *
 * To run a query within a React component, call `useBusinessProfileQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessProfileQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessProfileQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useBusinessProfileQueryQuery(baseOptions?: Apollo.QueryHookOptions<BusinessProfileQueryQuery, BusinessProfileQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessProfileQueryQuery, BusinessProfileQueryQueryVariables>(BusinessProfileQueryDocument, options);
      }
export function useBusinessProfileQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessProfileQueryQuery, BusinessProfileQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessProfileQueryQuery, BusinessProfileQueryQueryVariables>(BusinessProfileQueryDocument, options);
        }
export type BusinessProfileQueryQueryHookResult = ReturnType<typeof useBusinessProfileQueryQuery>;
export type BusinessProfileQueryLazyQueryHookResult = ReturnType<typeof useBusinessProfileQueryLazyQuery>;
export type BusinessProfileQueryQueryResult = Apollo.QueryResult<BusinessProfileQueryQuery, BusinessProfileQueryQueryVariables>;