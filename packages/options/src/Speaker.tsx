import { Card, Checkbox, FormGroup, H5, InputGroup } from '@blueprintjs/core'
import { produce } from 'immer'
import { LotCommand } from './components/LotCommand'
import { MultiInput } from './components/MultiInput'
import { NumberText } from './components/NumberText'
import { type SpeakerConfig } from './type'

export function Speaker(props: {
  config: SpeakerConfig
  onChange: (config: SpeakerConfig) => void
}) {
  const { config, onChange } = props

  return (
    <div className={'tw-space-y-4'}>
      <Card>
        <H5>控制</H5>
        <FormGroup
          inline
          label={'小米账号 ID'}
          helperText={
            <>
              <a
                href="https://account.xiaomi.com/fe/service/account/profile"
                target={'_blank'}
              >
                登录小米账号
              </a>
              后即可看到【小米 ID】。注意：不是手机号或邮箱。
            </>
          }
        >
          <InputGroup
            required
            value={config.userId || ''}
            onValueChange={(newVal) => {
              const newState = produce(config, (draft) => {
                draft.userId = newVal
              })
              onChange(newState)
            }}
          />
        </FormGroup>
        <FormGroup label={'小米账号密码'} inline>
          <InputGroup
            required
            type={'password'}
            value={config.password || ''}
            onValueChange={(newVal) => {
              const newState = produce(config, (draft) => {
                draft.password = newVal
              })
              onChange(newState)
            }}
          ></InputGroup>
        </FormGroup>
        <FormGroup
          inline
          label={'设备 ID'}
          helperText={
            '小爱音箱 ID 或名称。填写你通过小爱音箱 APP 连接音箱时设置的名称即可，例如“小爱音箱Pro”。'
          }
        >
          <InputGroup
            required
            value={config.did || ''}
            onValueChange={(newVal) => {
              const newState = produce(config, (draft) => {
                draft.did = newVal
              })
              onChange(newState)
            }}
          />
        </FormGroup>
        <FormGroup label={'TTS 命令'} inline>
          <LotCommand
            required
            value={config.ttsCommand}
            count={2}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.ttsCommand = value
              })
              onChange(newState)
            }}
          />
        </FormGroup>
        <FormGroup label={'唤醒命令'} inline>
          <LotCommand
            required
            value={config.wakeUpCommand}
            count={2}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.wakeUpCommand = value
              })
              onChange(newState)
            }}
          />
        </FormGroup>
        <FormGroup label={'播放命令'} inline>
          <LotCommand
            value={config.playingCommand}
            count={3}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.playingCommand = value
              })
              onChange(newState)
            }}
          />
        </FormGroup>
      </Card>

      <Card>
        <H5>连续对话（唤醒模式）</H5>
        <FormGroup
          label={'连续对话'}
          helperText={
            '部分小爱音箱型号无法查询到正确的播放状态，需要关闭连续对话。'
          }
          inline
        >
          <Checkbox
            checked={config.streamResponse}
            onChange={(event) => {
              const newVal = event.target.checked
              const newState = produce(config, (draft) => {
                draft.streamResponse = newVal
              })
              onChange(newState)
            }}
          />
        </FormGroup>

        <FormGroup
          label={'唤醒关键词'}
          helperText={
            '当消息以关键词开头时，会进入 AI 唤醒状态。AI 唤醒状态下，可以跟 AI 连续对话。'
          }
          inline
        >
          <MultiInput
            value={config.wakeUpKeywords}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.wakeUpKeywords = value
              })
              onChange(newState)
            }}
          />
        </FormGroup>

        <FormGroup
          label={'退出关键词'}
          helperText={'当消息以关键词开头时，会退出 AI 唤醒状态。'}
          inline
        >
          <MultiInput
            value={config.exitKeywords}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.exitKeywords = value
              })
              onChange(newState)
            }}
          />
        </FormGroup>
        <FormGroup
          label={'自动退出时间'}
          helperText={'连续对话时，无响应多久后自动退出。单位：秒。'}
          inline
        >
          <NumberText
            required
            value={
              config.exitKeepAliveAfter == null
                ? null
                : config.exitKeepAliveAfter
            }
            min={1}
            pattern={'\\d+'}
            onValueChange={(newVal) => {
              const newState = produce(config, (draft) => {
                draft.exitKeepAliveAfter = newVal == null ? undefined : newVal
              })
              onChange(newState)
            }}
          />
        </FormGroup>
        <FormGroup
          label={'检测 1'}
          helperText={
            '连续对话时，播放状态检测间隔（单位：毫秒）。调小此值可以降低小爱回复之间的停顿感，请酌情调节'
          }
          inline
        >
          <NumberText
            required
            value={config.checkInterval == null ? null : config.checkInterval}
            min={500}
            pattern={'\\d+'}
            onValueChange={(newVal) => {
              const newState = produce(config, (draft) => {
                draft.checkInterval = newVal == null ? undefined : newVal
              })
              onChange(newState)
            }}
          />
        </FormGroup>
        <FormGroup
          label={'检测 2'}
          helperText={
            '连续对话时，下发 TTS 指令多长时间后开始检测设备播放状态（单位：秒）。最好不要低于 1 秒。）'
          }
          inline
        >
          <NumberText
            required
            value={
              config.checkTTSStatusAfter == null
                ? null
                : config.checkTTSStatusAfter
            }
            min={1}
            pattern={'\\d+'}
            onValueChange={(newVal) => {
              const newState = produce(config, (draft) => {
                draft.checkTTSStatusAfter = newVal == null ? undefined : newVal
              })

              onChange(newState)
            }}
          />
        </FormGroup>
      </Card>

      <Card>
        <H5>关键词</H5>
        <FormGroup
          label={'调用 AI 关键词（单次）'}
          helperText={'当消息以关键词开头时，会调用 AI 来响应用户消息。'}
          inline
        >
          <MultiInput
            value={config.callAIKeywords}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.callAIKeywords = value
              })

              onChange(newState)
            }}
          />
        </FormGroup>
      </Card>
      <Card>
        <H5>提示语</H5>

        <FormGroup
          label={'进入 AI'}
          helperText={'进入 AI 唤醒模式时的提示语。'}
          inline
        >
          <MultiInput
            value={config.onEnterAI}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.onEnterAI = value
              })

              onChange(newState)
            }}
          />
        </FormGroup>

        <FormGroup
          label={'退出 AI'}
          helperText={'退出 AI 唤醒模式时的提示语。'}
          inline
        >
          <MultiInput
            value={config.onExitAI}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.onExitAI = value
              })

              onChange(newState)
            }}
          />
        </FormGroup>

        <FormGroup
          label={'AI 思考中'}
          helperText={'AI 开始回答时的提示语。'}
          inline
        >
          <MultiInput
            value={config.onAIAsking}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.onAIAsking = value
              })

              onChange(newState)
            }}
          />
        </FormGroup>

        <FormGroup
          label={'AI 回答完毕'}
          helperText={'AI 结束回答时的提示语。'}
          inline
        >
          <MultiInput
            value={config.onAIReplied}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.onAIReplied = value
              })

              onChange(newState)
            }}
          />
        </FormGroup>

        <FormGroup
          label={'AI 出错'}
          helperText={'AI 回答异常时的提示语。'}
          inline
        >
          <MultiInput
            value={config.onAIError}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.onAIError = value
              })

              onChange(newState)
            }}
          />
        </FormGroup>
      </Card>
      <Card>
        <H5>其它</H5>
        <FormGroup label={'TTS 引擎'} inline>
          <InputGroup
            required
            value={config.tts || ''}
            onValueChange={(newVal) => {
              const newState = produce(config, (draft) => {
                draft.tts = newVal
              })

              onChange(newState)
            }}
          />
        </FormGroup>

        <FormGroup
          label={'切换音色关键词'}
          helperText={'只有配置了第三方 TTS 引擎时才有效'}
          inline
        >
          <MultiInput
            value={config.switchSpeakerKeywords}
            onChange={(value) => {
              const newState = produce(config, (draft) => {
                draft.switchSpeakerKeywords = value
              })

              onChange(newState)
            }}
          />
        </FormGroup>
      </Card>
    </div>
  )
}