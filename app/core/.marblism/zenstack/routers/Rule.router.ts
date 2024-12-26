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

        createMany: procedure.input($Schema.RuleInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rule.createMany(input as any))),

        create: procedure.input($Schema.RuleInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rule.create(input as any))),

        deleteMany: procedure.input($Schema.RuleInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rule.deleteMany(input as any))),

        delete: procedure.input($Schema.RuleInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rule.delete(input as any))),

        findFirst: procedure.input($Schema.RuleInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).rule.findFirst(input as any))),

        findMany: procedure.input($Schema.RuleInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).rule.findMany(input as any))),

        findUnique: procedure.input($Schema.RuleInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).rule.findUnique(input as any))),

        updateMany: procedure.input($Schema.RuleInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rule.updateMany(input as any))),

        update: procedure.input($Schema.RuleInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rule.update(input as any))),

        count: procedure.input($Schema.RuleInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).rule.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.RuleCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RuleCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RuleCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RuleCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.RuleCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RuleCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RuleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RuleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RuleCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RuleCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RuleGetPayload<T>, Context>) => Promise<Prisma.RuleGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.RuleDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RuleDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RuleDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RuleDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.RuleDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RuleDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RuleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RuleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RuleDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RuleDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RuleGetPayload<T>, Context>) => Promise<Prisma.RuleGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.RuleFindFirstArgs, TData = Prisma.RuleGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.RuleFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RuleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RuleFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.RuleFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RuleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RuleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.RuleFindManyArgs, TData = Array<Prisma.RuleGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.RuleFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.RuleGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RuleFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.RuleFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.RuleGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.RuleGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.RuleFindUniqueArgs, TData = Prisma.RuleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.RuleFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RuleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RuleFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RuleFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RuleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RuleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.RuleUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RuleUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RuleUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RuleUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.RuleUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RuleUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RuleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RuleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RuleUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RuleUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RuleGetPayload<T>, Context>) => Promise<Prisma.RuleGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.RuleCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.RuleCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.RuleCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.RuleCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.RuleCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.RuleCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.RuleCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.RuleCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
