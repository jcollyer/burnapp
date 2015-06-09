class HrmSession < ActiveRecord::Base
  has_many :hrm_data_points
  belongs_to :user
end
