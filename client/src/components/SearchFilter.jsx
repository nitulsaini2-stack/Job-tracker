
const SearchFilter = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search company or job role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border rounded-md px-3 py-2 outline-none"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-md px-3 py-2 outline-none"
      >
        <option value="All">All Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
};

export default SearchFilter;