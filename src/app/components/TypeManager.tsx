import { Button, Input, Stack, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ContainerContext } from '../libs/recorder/base'
import { Recorder } from '../interfaces'

export function TypeManager() {
  const container = useContext(ContainerContext)
  let recorder: any
  if (container) {
    recorder = container.resolve<Recorder<MyType>>('recorder')
  }

  const [name, setName] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const [data, setData] = useState<MyType[]>([])

  const load = async () => {
    setData(await recorder.list())
  }
  useEffect(() => {
    load()
  }, [])

  const save = async () => {
    await recorder.save({ name, code })
    setName('')
    setCode('')
    load()
  }

  const deleteData = async (id?: number) => {
    if (id) {
      await recorder.delete(id)
      load()
    }
  }

  return (
    <>
      <Stack spacing={1}>
        <Stack direction={'row'} spacing={1}>
          <Input
            type='text'
            placeholder='name'
            onChange={(e: any) => {
              setName(e.target.value)
            }}
            value={name}
          ></Input>
          <Input
            type='text'
            placeholder='code'
            onChange={(e: any) => {
              setCode(e.target.value)
            }}
            value={code}
          ></Input>
          <Button variant='contained' onClick={save}>
            Save
          </Button>
        </Stack>
        <Table>
          <TableBody>
            {data.map((datum) => {
              return (
                <TableRow key={datum.id}>
                  <TableCell>{datum.name}</TableCell>
                  <TableCell>{datum.code}</TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        deleteData(datum.id)
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Stack>
    </>
  )
}
