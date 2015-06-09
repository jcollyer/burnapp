class HrmDataPointsController < ApplicationController
  def index
    @hrm_data_points = HrmDataPoint.all
    # @hrm_data_points = @current_hrm_session.hrm_data_pints.order("created_at");
  end

  def show
    @hrm_data_point = HrmDataPoint.find(params[:id]);
  end
end
