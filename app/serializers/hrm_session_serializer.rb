class HrmSessionSerializer < ActiveModel::Serializer
  attributes :duration
  has_many :hrm_data_points
  # belongs_to :user
end
