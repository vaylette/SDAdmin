import OverviewCard from "../_components/overview/overviewCard"

export default function Dashboard() {
  const data = [
    {
      title: 'Daily Active Users',
      quantity: 235,
      growth: +3.5
    },
    {
      title: 'Total App Downloads',
      quantity: '11.3k',
      growth: +3.5
    },
    {
      title: 'Web Visitors',
      quantity: 507,
      growth: -11
    },
    {
      title: 'Total Students',
      quantity: '68k',
      growth: +3.5
    },
    {
      title: 'Total Teachers',
      quantity: 193,
      growth: +3.5
    },
    {
      title: 'Total Parents',
      quantity: 912,
      growth: -11
    },
    {
      title: 'Total Admins',
      quantity: 12,
      growth: +3.5
    },
    {
      title: 'Total Revenue',
      quantity: '9.2M',
      growth: +3.5
    },
    {
      title: 'Number of Schools',
      quantity: 115,
      growth: -11
    },
  ]
  return (
    <>
      <div className='grid grid-cols-4 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-5'>
        {data.map((item, index) => (
          <OverviewCard key={index} title={item.title} quantity={item.quantity} growth={item.growth} />
        ))}
      </div>
    </>
  )
}
