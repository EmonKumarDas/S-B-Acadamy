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

        createMany: procedure.input($Schema.ResultInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).result.createMany(input as any))),

        create: procedure.input($Schema.ResultInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).result.create(input as any))),

        deleteMany: procedure.input($Schema.ResultInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).result.deleteMany(input as any))),

        delete: procedure.input($Schema.ResultInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).result.delete(input as any))),

        findFirst: procedure.input($Schema.ResultInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).result.findFirst(input as any))),

        findMany: procedure.input($Schema.ResultInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).result.findMany(input as any))),

        findUnique: procedure.input($Schema.ResultInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).result.findUnique(input as any))),

        updateMany: procedure.input($Schema.ResultInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).result.updateMany(input as any))),

        update: procedure.input($Schema.ResultInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).result.update(input as any))),

        count: procedure.input($Schema.ResultInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).result.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ResultCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ResultCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ResultCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ResultCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ResultCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ResultCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ResultGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ResultGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ResultCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ResultCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ResultGetPayload<T>, Context>) => Promise<Prisma.ResultGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ResultDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ResultDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ResultDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ResultDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ResultDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ResultDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ResultGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ResultGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ResultDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ResultDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ResultGetPayload<T>, Context>) => Promise<Prisma.ResultGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ResultFindFirstArgs, TData = Prisma.ResultGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ResultFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ResultGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ResultFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ResultFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ResultGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ResultGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ResultFindManyArgs, TData = Array<Prisma.ResultGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ResultFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ResultGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ResultFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ResultFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ResultGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ResultGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ResultFindUniqueArgs, TData = Prisma.ResultGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ResultFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ResultGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ResultFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ResultFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ResultGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ResultGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ResultUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ResultUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ResultUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ResultUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ResultUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ResultUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ResultGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ResultGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ResultUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ResultUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ResultGetPayload<T>, Context>) => Promise<Prisma.ResultGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ResultCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ResultCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ResultCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ResultCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ResultCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ResultCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ResultCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ResultCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
