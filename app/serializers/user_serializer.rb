class UserSerializer < ActiveModel::Serializer
  attributes :username, :gender, :age, :hr_zone1_bpm_min
  has_many :hrm_sessions
end
