import type { Aria2DownloadGid, Aria2DownloadStatus, Aria2ServerVersion } from '@huan_kong/maria2'
import type { AddTask, GetTask, OpenTaskFolder, OperateTask, RemoveTask } from '@main/ipc/aria2.ts'
import type { Config, SelectedFolder } from '@main/ipc/config.ts'
import type { GetConfigRes, GetLimitReq, GetLimitRes } from '@main/ipc/parse.ts'
import type { IsMaximized } from '@main/ipc/window.ts'
import type { SuccessResponse } from '@main/utils/response.ts'

export type BaseIpcEvents = {
  'window.minimize': () => null
  'window.maximize': () => null
  'window.unMaximize': () => null
  'window.getIsMaximized': () => IsMaximized
  'window.close': () => null

  'config.get': () => Config
  'config.set': (config: Config) => null
  'config.selectFoloder': () => SelectedFolder

  'aria2.start': () => null
  'aria2.stop': () => null
  'aria2.restart': () => null
  'aria2.getVersion': () => Aria2ServerVersion
  'aria2.addTask': (params: AddTask) => { gid: Aria2DownloadGid }
  'aria2.getActive': () => Aria2DownloadStatus[]
  'aria2.getWaiting': (params: GetTask) => Aria2DownloadStatus[]
  'aria2.getStopped': (params: GetTask) => Aria2DownloadStatus[]
  'aria2.unpauseTask': (params: OperateTask) => null
  'aria2.pauseTask': (params: OperateTask) => null
  'aria2.removeTask': (params: RemoveTask) => null
  'aria2.removeTaskResult': (params: OperateTask) => null
  'aria2.openTaskFolder': (params: OpenTaskFolder) => null

  'parse.getLimit': (params: GetLimitReq) => GetLimitRes
  'parse.getConfig': () => GetConfigRes
}

export type IpcEvents = {
  [K in keyof BaseIpcEvents]: BaseIpcEvents[K] extends (...args: infer P) => infer R
    ? (...args: P) => SuccessResponse<R>
    : never
}
