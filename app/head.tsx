import { CssBaseline } from '@nextui-org/react';

export default function Head() {
  return (
    <>
      <title>Kimbros Project</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="A life-graph project by Kimbros" />
      <link rel="icon" href="/favicon.ico" />
      {CssBaseline.flush()}
    </>
  )
}
