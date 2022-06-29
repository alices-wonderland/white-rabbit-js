/* eslint-disable */
// @generated by protobuf-ts 2.7.0 with parameter eslint_disable,ts_nocheck,optimize_code_size
// @generated from protobuf file "group.proto" (package "whiterabbit.group", syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { GroupService } from "./group";
import type { Commands } from "./group";
import type { Command } from "./group";
import type { Group } from "./group";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import type { GroupPage } from "./group";
import type { FindPageRequest } from "./shared";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { GroupResponse } from "./group";
import type { StringValue } from "./google/protobuf/wrappers";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service whiterabbit.group.GroupService
 */
export interface IGroupServiceClient {
  /**
   * @generated from protobuf rpc: findOne(google.protobuf.StringValue) returns (whiterabbit.group.GroupResponse);
   */
  findOne(
    input: StringValue,
    options?: RpcOptions
  ): UnaryCall<StringValue, GroupResponse>;
  /**
   * @generated from protobuf rpc: findPage(whiterabbit.shared.FindPageRequest) returns (whiterabbit.group.GroupPage);
   */
  findPage(
    input: FindPageRequest,
    options?: RpcOptions
  ): UnaryCall<FindPageRequest, GroupPage>;
  /**
   * @generated from protobuf rpc: findAll(google.protobuf.StringValue) returns (stream whiterabbit.group.Group);
   */
  findAll(
    input: StringValue,
    options?: RpcOptions
  ): ServerStreamingCall<StringValue, Group>;
  /**
   * @generated from protobuf rpc: handle(whiterabbit.group.Command) returns (whiterabbit.group.GroupResponse);
   */
  handle(
    input: Command,
    options?: RpcOptions
  ): UnaryCall<Command, GroupResponse>;
  /**
   * @generated from protobuf rpc: handleAll(whiterabbit.group.Commands) returns (stream whiterabbit.group.GroupResponse);
   */
  handleAll(
    input: Commands,
    options?: RpcOptions
  ): ServerStreamingCall<Commands, GroupResponse>;
}
/**
 * @generated from protobuf service whiterabbit.group.GroupService
 */
export class GroupServiceClient implements IGroupServiceClient, ServiceInfo {
  typeName = GroupService.typeName;
  methods = GroupService.methods;
  options = GroupService.options;
  constructor(private readonly _transport: RpcTransport) {}
  /**
   * @generated from protobuf rpc: findOne(google.protobuf.StringValue) returns (whiterabbit.group.GroupResponse);
   */
  findOne(
    input: StringValue,
    options?: RpcOptions
  ): UnaryCall<StringValue, GroupResponse> {
    const method = this.methods[0],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<StringValue, GroupResponse>(
      "unary",
      this._transport,
      method,
      opt,
      input
    );
  }
  /**
   * @generated from protobuf rpc: findPage(whiterabbit.shared.FindPageRequest) returns (whiterabbit.group.GroupPage);
   */
  findPage(
    input: FindPageRequest,
    options?: RpcOptions
  ): UnaryCall<FindPageRequest, GroupPage> {
    const method = this.methods[1],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<FindPageRequest, GroupPage>(
      "unary",
      this._transport,
      method,
      opt,
      input
    );
  }
  /**
   * @generated from protobuf rpc: findAll(google.protobuf.StringValue) returns (stream whiterabbit.group.Group);
   */
  findAll(
    input: StringValue,
    options?: RpcOptions
  ): ServerStreamingCall<StringValue, Group> {
    const method = this.methods[2],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<StringValue, Group>(
      "serverStreaming",
      this._transport,
      method,
      opt,
      input
    );
  }
  /**
   * @generated from protobuf rpc: handle(whiterabbit.group.Command) returns (whiterabbit.group.GroupResponse);
   */
  handle(
    input: Command,
    options?: RpcOptions
  ): UnaryCall<Command, GroupResponse> {
    const method = this.methods[3],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<Command, GroupResponse>(
      "unary",
      this._transport,
      method,
      opt,
      input
    );
  }
  /**
   * @generated from protobuf rpc: handleAll(whiterabbit.group.Commands) returns (stream whiterabbit.group.GroupResponse);
   */
  handleAll(
    input: Commands,
    options?: RpcOptions
  ): ServerStreamingCall<Commands, GroupResponse> {
    const method = this.methods[4],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<Commands, GroupResponse>(
      "serverStreaming",
      this._transport,
      method,
      opt,
      input
    );
  }
}