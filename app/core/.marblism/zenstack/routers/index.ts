/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createRuleRouter from "./Rule.router";
import createSubjectRouter from "./Subject.router";
import createAttendanceRouter from "./Attendance.router";
import createFeeRouter from "./Fee.router";
import createResultRouter from "./Result.router";
import createScheduleRouter from "./Schedule.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as RuleClientType } from "./Rule.router";
import { ClientType as SubjectClientType } from "./Subject.router";
import { ClientType as AttendanceClientType } from "./Attendance.router";
import { ClientType as FeeClientType } from "./Fee.router";
import { ClientType as ResultClientType } from "./Result.router";
import { ClientType as ScheduleClientType } from "./Schedule.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        rule: createRuleRouter(router, procedure),
        subject: createSubjectRouter(router, procedure),
        attendance: createAttendanceRouter(router, procedure),
        fee: createFeeRouter(router, procedure),
        result: createResultRouter(router, procedure),
        schedule: createScheduleRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    rule: RuleClientType<AppRouter>;
    subject: SubjectClientType<AppRouter>;
    attendance: AttendanceClientType<AppRouter>;
    fee: FeeClientType<AppRouter>;
    result: ResultClientType<AppRouter>;
    schedule: ScheduleClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
}
