class HrmDataPointSerializer < ActiveModel::Serializer
  attributes :duration, :bpm
  # belongs_to :hrm_session
end
