import { CreateJobRequest, Job, JobResponse, JobsListResponse, UpdateJobRequest } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";


// export interface JobFilterType {
//     companyName?: string[];
//     title?: string[];
//     educations?: string[];
//     experience?: number;
//     locations?: string[];
//     salaryRange?: string[];
//     jobType?: string[];
// }
export type JobFilterType = {
  jobType: string[];
  experience?: number;
  title: string[];
  locations: string[];
  salaryRange: string[];
  educations: string[];
  companyName: string[];
};


const jobApi = baseUrlApi.injectEndpoints({
    // tagTypes: ["allJobPosts"],
    endpoints: (builder) => ({
        // getAllJobPosts: builder.query({
        //     query: (filters: JobFilterType) => {

        //         const params = new URLSearchParams();

        //         if (filters.departments?.length) {
        //             filters.departments.forEach(dep => params.append('departments', dep));
        //         }

        //         if (filters.educations?.length) {
        //             filters.educations.forEach(edu => params.append('educations', edu));
        //         }

        //         if (filters.experience) {
        //             params.append('experience', filters.experience.toString());
        //         }

        //         if (filters.locations?.length) {
        //             filters.locations.forEach(loc => params.append('locations', loc));
        //         }

        //         if (filters.salaryRanges?.length) {
        //             filters.salaryRanges.forEach(salary => params.append('salaryRanges', salary));
        //         }

        //         if (filters.jobType?.length) {
        //             filters.jobType.forEach(mode => params.append('jobType', mode));
        //         }

        //         if (filters.companies?.length) {
        //             filters.companies.forEach(comp => params.append('companies', comp));
        //         }

        //         return {
        //             url: `/jobs/posts?${params.toString()}`,
        //             method: "GET"
        //         };
        //     },
        //     // invalidatesTags: ["allJobPosts"],
        // }),

        getAllJobPosts: builder.query({
            // query: (filters: JobFilterType & { search?: string }) => {
            query: (filters: JobFilterType) => {

                const params = new URLSearchParams();

                // Add search parameter if exists
                // if (filters.search) {
                //     params.append("search", filters.search);
                // }

                // other filters (optional)
                // filters.jobType?.forEach((type) => params.append("jobType", type));
                // filters.locations?.forEach((loc) => params.append("location", loc));
                // filters.companies?.forEach((c) => params.append("company", c));

                if (filters.title?.length) {
                    filters.title.forEach(dep => params.append('title', dep));
                }

                if (filters.educations?.length) {
                    filters.educations.forEach(edu => params.append('educations', edu));
                }

                if (filters.experience) {
                    params.append('experience', filters.experience.toString());
                }

                if (filters.locations?.length) {
                    filters.locations.forEach(loc => params.append('location', loc));
                }

                if (filters.salaryRange?.length) {
                    filters.salaryRange.forEach(salary => params.append('salaryRange', salary));
                }

                if (filters.jobType?.length) {
                    filters.jobType.forEach(mode => params.append('jobType', mode));
                }

                if (filters.companyName?.length) {
                    filters.companyName.forEach(comp => params.append('companyName', comp));
                }

                return {
                    url: `/jobs/posts?${params.toString()}`,
                    method: "GET"
                };
            },
            // invalidatesTags: ["allJobPosts"],
        }),

        getMyJobPosts: builder.query({
            query: () => "/jobs/my-job-posts",

        }),

        getAppliedJobs: builder.query({
            // query: () => ({
            //     url: "/apply/apply-job", // Your full endpoint is http://172.252.13.71:5005/api/v1/apply/apply-job
            //     method: "GET"
            // })
            query: () => '/apply/apply-job'
        }),

        recomandationJobs: builder.query({
            query: (profileId) => `/jobs/recommended-jobs/${profileId}`
        }),

        applyJob: builder.mutation({
            query: (jobId) => ({
                url: `/apply/apply-job`,
                method: "POST",
                body: jobId
            })
        }),

        createJobPost: builder.mutation({
            query: (data) => ({
                url: "/jobs/create-job-post",
                method: "POST",
                body: data,
            }),

        }),

        deleteJobPost: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: "DELETE",
            }),

        }),

        updateJobPost: builder.mutation({
            query: ({ id, data }) => ({
                url: `/jobs/${id}`,
                method: "PATCH",
                body: data,
            }),

        }),

    }),
});


export const {
    useCreateJobPostMutation,
    useGetMyJobPostsQuery,
    useGetAllJobPostsQuery,
    useLazyGetAllJobPostsQuery,
    useDeleteJobPostMutation,
    useUpdateJobPostMutation,
    useApplyJobMutation,
    useGetAppliedJobsQuery,
    useRecomandationJobsQuery,
} = jobApi;

