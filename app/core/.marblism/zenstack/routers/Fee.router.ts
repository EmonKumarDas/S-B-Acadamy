/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.FeeInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fee.createMany(input as any))),

        create: procedure.input($Schema.FeeInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fee.create(input as any))),

        deleteMany: procedure.input($Schema.FeeInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fee.deleteMany(input as any))),

        delete: procedure.input($Schema.FeeInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fee.delete(input as any))),

        findFirst: procedure.input($Schema.FeeInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).fee.findFirst(input as any))),

        findMany: procedure.input($Schema.FeeInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).fee.findMany(input as any))),

        findUnique: procedure.input($Schema.FeeInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).fee.findUnique(input as any))),

        updateMany: procedure.input($Schema.FeeInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fee.updateMany(input as any))),

        update: procedure.input($Schema.FeeInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fee.update(input as any))),

        count: procedure.input($Schema.FeeInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).fee.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.FeeCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FeeCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FeeCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FeeCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.FeeCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FeeCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FeeCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FeeCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FeeGetPayload<T>, Context>) => Promise<Prisma.FeeGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.FeeDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FeeDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FeeDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FeeDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.FeeDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FeeDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FeeDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FeeDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FeeGetPayload<T>, Context>) => Promise<Prisma.FeeGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.FeeFindFirstArgs, TData = Prisma.FeeGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.FeeFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FeeGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FeeFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FeeFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FeeGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FeeGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.FeeFindManyArgs, TData = Array<Prisma.FeeGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.FeeFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.FeeGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FeeFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FeeFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.FeeGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.FeeGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.FeeFindUniqueArgs, TData = Prisma.FeeGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FeeFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FeeGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FeeFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FeeFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FeeGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FeeGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.FeeUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FeeUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FeeUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FeeUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.FeeUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FeeUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FeeUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FeeUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FeeGetPayload<T>, Context>) => Promise<Prisma.FeeGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.FeeCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FeeCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.FeeCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.FeeCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.FeeCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.FeeCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.FeeCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FeeCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
