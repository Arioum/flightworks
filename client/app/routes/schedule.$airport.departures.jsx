import ScheduleTable from '../layouts/ScheduleTable';
import scheduleData from '../arrival-data.json';

const Departures = () => {
  return (
    <div>
      <ScheduleTable scheduleData={scheduleData} />
    </div>
  );
};

export default Departures;
