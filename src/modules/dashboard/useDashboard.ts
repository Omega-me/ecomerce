const useDashboardModule = () => {
  return {};
};

export default useDashboardModule;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DashboardModuleType
  extends ReturnType<typeof useDashboardModule> {}
