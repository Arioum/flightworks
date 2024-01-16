import ScheduleTable from '../layouts/ScheduleTable';
import scheduleData from '../arrival-data.json';

const Arrivals = () => {
  return (
    <div>
      <ScheduleTable scheduleData={scheduleData} />
    </div>
  );
};

export default Arrivals;
