import { emptyMaexApi as api } from './emptyMaex';
export const addTagTypes = ['web', 'app'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getSites: build.query<GetSitesApiResponse, GetSitesApiArg>({
        query: () => ({ url: `/site` }),
        providesTags: ['web'],
      }),
      getSite: build.query<GetSiteApiResponse, GetSiteApiArg>({
        query: queryArg => ({ url: `/site/${queryArg.siteId}` }),
        providesTags: ['app', 'web'],
      }),
      getWasteItemsForSite: build.query<
        GetWasteItemsForSiteApiResponse,
        GetWasteItemsForSiteApiArg
      >({
        query: queryArg => ({ url: `/site/${queryArg.siteId}/wasteItems` }),
        providesTags: ['app', 'web'],
      }),
      getOpeningHoursEntriesForSite: build.query<
        GetOpeningHoursEntriesForSiteApiResponse,
        GetOpeningHoursEntriesForSiteApiArg
      >({
        query: queryArg => ({
          url: `/site/${queryArg.siteId}/openingHoursEntries`,
        }),
        providesTags: ['web'],
      }),
      setOpeningHoursEntriesForSite: build.mutation<
        SetOpeningHoursEntriesForSiteApiResponse,
        SetOpeningHoursEntriesForSiteApiArg
      >({
        query: queryArg => ({
          url: `/site/${queryArg.siteId}/openingHoursEntries`,
          method: 'PUT',
          body: queryArg.body,
        }),
        invalidatesTags: ['web'],
      }),
      getLocksForSite: build.query<
        GetLocksForSiteApiResponse,
        GetLocksForSiteApiArg
      >({
        query: queryArg => ({ url: `/site/${queryArg.siteId}/locks` }),
        providesTags: ['web'],
      }),
      openLock: build.mutation<OpenLockApiResponse, OpenLockApiArg>({
        query: queryArg => ({
          url: `/lock/${queryArg.lockId}/open`,
          method: 'POST',
        }),
        invalidatesTags: ['web'],
      }),
      getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
        query: () => ({ url: `/profile` }),
        providesTags: ['web'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as maexApi };
export type GetSitesApiResponse = /** status 200 Successful operation */ Site[];
export type GetSitesApiArg = void;
export type GetSiteApiResponse = /** status 200 Successful operation */ Site;
export type GetSiteApiArg = {
  siteId: string;
};
export type GetWasteItemsForSiteApiResponse =
  /** status 200 Successful operation */ WasteItem[];
export type GetWasteItemsForSiteApiArg = {
  siteId: string;
};
export type GetOpeningHoursEntriesForSiteApiResponse =
  /** status 200 Successful operation */ OpeningHoursEntry[];
export type GetOpeningHoursEntriesForSiteApiArg = {
  siteId: string;
};
export type SetOpeningHoursEntriesForSiteApiResponse =
  /** status 204 Successful operation */ undefined;
export type SetOpeningHoursEntriesForSiteApiArg = {
  siteId: string;
  body: OpeningHoursEntry[];
};
export type GetLocksForSiteApiResponse =
  /** status 200 Successful operation */ Lock[];
export type GetLocksForSiteApiArg = {
  siteId: string;
};
export type OpenLockApiResponse =
  /** status 204 Successful operation */ undefined;
export type OpenLockApiArg = {
  lockId: string;
};
export type GetProfileApiResponse =
  /** status 200 Successful operation */ Profile;
export type GetProfileApiArg = void;
export type Coordinates = {
  latitude: number;
  longitude: number;
};
export type Module = 'booking' | 'appointment' | 'payment';
export type Site = {
  id: string;
  name: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  phoneNumber?: string;
  coordinates: Coordinates;
  modules: Module[];
  basePrice?: number;
  tutorial: string;
};
export type ErrorWithCode = {
  error: {
    code: string;
    message: string;
    [key: string]: any;
  };
};
export type NotFoundError = ErrorWithCode;
export type WasteItem = {
  id: string;
  name: string;
  description?: string;
  examples?: string;
  imageUri?: string;
  iconUri?: string;
  price: number;
  unit: string;
  maxAmount?: number;
};
export type OpeningHoursEntry = {
  openingType: 'regular' | 'extended';
  weekday:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';
  startMinutes: number;
  endMinutes: number;
  chained: boolean;
};
export type Lock = {
  id: string;
  hardwareId: string;
  siteId?: string;
};
export type AccessDeniedError = ErrorWithCode;
export type Profile = {
  id: string;
  displayName: string;
  givenName: string;
  surname: string;
  mail?: string;
  streetAddress: string;
  postalCode: string;
  city: string;
};
export const {
  useGetSitesQuery,
  useLazyGetSitesQuery,
  useGetSiteQuery,
  useLazyGetSiteQuery,
  useGetWasteItemsForSiteQuery,
  useLazyGetWasteItemsForSiteQuery,
  useGetOpeningHoursEntriesForSiteQuery,
  useLazyGetOpeningHoursEntriesForSiteQuery,
  useSetOpeningHoursEntriesForSiteMutation,
  useGetLocksForSiteQuery,
  useLazyGetLocksForSiteQuery,
  useOpenLockMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = injectedRtkApi;
