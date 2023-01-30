/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateBoardAuthorityDto } from './CreateBoardAuthorityDto';

export type CreateAdminDto = {
    /**
     * 로그인에 사용할 아이디
     */
    loginId: string;
    /**
     * 비밀번호
     */
    password: string;
    /**
     * 닉네임
     */
    nickname: string;
    /**
     * 권한
     */
    authoirty: CreateAdminDto.authoirty;
    boards: Array<CreateBoardAuthorityDto>;
};

export namespace CreateAdminDto {

    /**
     * 권한
     */
    export enum authoirty {
        SUPER = 'Super',
        STUDENT_COUNCIL = 'StudentCouncil',
        GUEST = 'Guest',
    }


}
