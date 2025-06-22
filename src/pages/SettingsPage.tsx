import {ChangeEvent, useEffect, useState} from "react";
import {DropdownPicker, DropdownPickerOption} from "../components/DropdownPicker";
import {ENABLE_NOTIFICATION_KEY, DURATION_KEY, REPEAT_KEY} from "../services/StorageService.ts";
// @ts-ignore
import packageJson from '../../package.json';

export const SettingsPage = () => {

  const intervalOptions: DropdownPickerOption<number>[] = [
    {value: 1, label: '1 minute'},
    {value: 10, label: '10 minute'},
    {value: 20, label: '20 minutes'},
    {value: 30, label: '30 minutes'},
    {value: 60, label: '60 minutes'},
  ]
  const repeatOptions: DropdownPickerOption<boolean>[] = [
    {value: true, label: 'Yes'},
    {value: false, label: 'No'},
  ]

  const [intervalOptionSelected, setIntervalOptionSelected] = useState<number | undefined>()
  const [repeatOptionSelected, setRepeatOptionSelected] = useState<boolean | undefined>()
  const [enableNotification, setEnableNotification] = useState<boolean | undefined>()

  useEffect(() => {
    const intervalTime = localStorage.getItem(DURATION_KEY)
    const repeat = localStorage.getItem(REPEAT_KEY)
    const enableNotification = localStorage.getItem(ENABLE_NOTIFICATION_KEY)
    setEnableNotification(enableNotification === 'true')
    if (!intervalTime) {
      const defaultDuration: number = intervalOptions[0].value
      const newTime = parseInt(intervalTime ?? `${defaultDuration}`)      
      setIntervalOptionSelected(newTime)
    }
    setRepeatOptionSelected(repeat === 'true')
  }, []);

  useEffect(() => {
    if (!intervalOptionSelected) return
    localStorage.setItem(DURATION_KEY, (intervalOptionSelected * 60).toString())
  }, [intervalOptionSelected]);

  useEffect(() => {
    if (repeatOptionSelected === undefined) return
    localStorage.setItem(REPEAT_KEY, repeatOptionSelected.toString())
  }, [repeatOptionSelected]);

  const handleOnEnableNotifications = (e: ChangeEvent<HTMLInputElement>) => {
    setEnableNotification(e.target.checked)
    localStorage.setItem(ENABLE_NOTIFICATION_KEY, (e.target.checked).toString())
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-start w-full">Settings</h1>
      <div className="space-y-6">
        <div className="p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer"
                       checked={enableNotification}
                       onChange={handleOnEnableNotifications}/>
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className={'w-1/2 text-start'}>Duration</span>
              <DropdownPicker
                className={"w-full mb-4"}
                options={intervalOptions}
                selected={intervalOptionSelected}
                onChange={setIntervalOptionSelected}/>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className={'w-1/2 text-start'}>Repeat</span>
              <DropdownPicker
                className={"w-full mb-4"}
                options={repeatOptions}
                selected={repeatOptionSelected}
                onChange={(value) => {
                  console.log(value)
                  setRepeatOptionSelected(`${value}` === "true")
                }}/>
            </div>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-center mt-8 select-none">
        Version: v{packageJson.version}
      </div>
    </div>
  );
};