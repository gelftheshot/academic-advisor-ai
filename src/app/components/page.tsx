import { Alerts } from './Alerts'
import { BadgeComponent } from './Badge'
import { Modals } from './Modals'
import { SkeletonComponent } from './Skeleton'
import { Snackbars } from './Snackbars'
import { SpinnerAndButton } from './SpinnerAndButton'

export const metadata = {
  title: 'Components'
}

export default function Page() {
  return (
    <div className="p-5">
      <h1 data-test="h1Title" className="pb-4 text-center text-2xl font-medium">
        Some components of this template
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        <SpinnerAndButton />
        <Modals />
        <Snackbars />
        <SkeletonComponent />
        <Alerts />
        <BadgeComponent />
      </div>
    </div>
  )
}
