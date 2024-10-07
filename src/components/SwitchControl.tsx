export enum ViewBy {
  assetClass = "assetClass",
  specificAsset = "specificAsset",
}

type SwitchControlProps = {
  viewBy: ViewBy;
  setViewBy: (viewBy: ViewBy) => void;
};

const SwitchControl: React.FC<SwitchControlProps> = ({viewBy, setViewBy}) => {
  return (
      <div className="flex items-center mb-4">
        <label className="mr-2">View by:</label>
          <select
              className="border-primary-500 border rounded p-2 bg-secondary-100"
              value={viewBy}
              onChange={(e) => setViewBy(e.target.value as ViewBy)}
          >
            <option value={ViewBy.assetClass}>Asset Class</option>
            <option value={ViewBy.specificAsset}>Specific Asset</option>
          </select>
      </div>
);
};

export default SwitchControl;