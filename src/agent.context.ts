import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { ProtocolException } from './protocol.exception';
import { ProtocolErrorCode } from './protocol.errorcode';

/**
 * To authenticate with a given agent there needs to be an agentId specified
 * Locally for testing this can be set with an 'agent' header
 * In our remote envs there should be an 'agent' attribute in the JWT metadata
 */
export class AgentContext {

    constructor(
        @Inject(REQUEST) protected readonly req: Request,
    ) { }

    /**
     * An environment variable can be passed in to either pull the agentId from the auth header (for remote)
     * or from a test header called 'agent' (for local testing)
     */
    public getAgentId(guardEnabled = true): string {
        if (guardEnabled) {
            return this.getAgentIdFromAuth();
        }
        return this.getAgentIdFromLocalHeader();
    }

    /**
     * Parses the JWT to extract the agent value from the metadata
     * Note that the JWT has already been validated by the gateway
     */
    public getAgentIdFromAuth(): string {
        const authHeader = this.req.headers.authorization;
        if (!authHeader) {
            throw new ProtocolException(ProtocolErrorCode.FORBIDDEN_EXCEPTION, 'AgentContext: No auth header', null, 403);
        }

        const token = authHeader.slice(7, authHeader.length);
        if (!token) {
            throw new ProtocolException(ProtocolErrorCode.FORBIDDEN_EXCEPTION, 'AgentContext: No token in auth header', null, 403);
        }

        let metaData;
        try {
            metaData = jwt.decode(token);
            if (!metaData) {
                throw new Error();
            }
        } catch (e) {
            throw new ProtocolException(ProtocolErrorCode.FORBIDDEN_EXCEPTION, 'AgentContext: Failed to decode JWT', null, 403);
        }

        const agentId: string = metaData.agent;
        if (!agentId) {
            throw new ProtocolException(ProtocolErrorCode.FORBIDDEN_EXCEPTION, 'AgentContext: No agent attribute in token metadata', null, 403);
        }
        
        return agentId;
    }

    /**
     * For local testing, instead of needing a JWT you can just pass the agentId through the 'agent' header
     */
    public getAgentIdFromLocalHeader(): string {
        const agentHeader = this.req.headers.agent;
        if (!agentHeader) {
            throw new ProtocolException(ProtocolErrorCode.FORBIDDEN_EXCEPTION, 'AgentContext: No agent header', null, 403);
        }
        return agentHeader;
    }
}
