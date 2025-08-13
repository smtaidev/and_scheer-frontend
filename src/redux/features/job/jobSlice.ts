import { CreateJobRequest, Job, JobResponse, JobsListResponse, UpdateJobRequest } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";


export interface JobFilterType {
    companyName?: string[];
    title?: string[];
    educations?: string[];
    experience?: string;
    locations?: string[];
    salaryRange?: string[];
    jobType?: string[];
}

const jobApi = baseUrlApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobPosts: builder.query({

            query: (filters: JobFilterType) => {

                const params = new URLSearchParams();

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

        }),

        getMyJobPosts: builder.query({
            query: () => "/jobs/my-job-posts",

        }),

        getAppliedJobs: builder.query({
            query: () => '/apply/apply-job'
        }),
        getInterviews: builder.query({
            query: () => '/interviews/my'
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
        saveJobPost: builder.mutation({
            query: (data) => ({
                url: `/save-jobs/save`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SaveJob"]

        }),
        getSavedJobs: builder.query({
            query: () => '/save-jobs', // This is the correct syntax
            providesTags: ['SaveJob'],
        }),
        deleteSavedPost: builder.mutation({
            query: (id) => ({
                url: `/save-jobs/delete/${id}`,
                method: "DELETE",
            }),
        invalidatesTags: ["SaveJob"]
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
    useSaveJobPostMutation,
    useDeleteSavedPostMutation,
    useGetSavedJobsQuery,
    useGetInterviewsQuery
} = jobApi;

