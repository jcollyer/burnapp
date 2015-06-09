class AddPropsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string
    add_column :users, :gender, :string
    add_column :users, :age, :integer
    add_column :users, :hr_zone1_bpm_min, :integer
    add_column :users, :hr_zone1_bpm_max, :integer
    add_column :users, :hr_zone2_bpm_min, :integer
    add_column :users, :hr_zone2_bpm_max, :integer
    add_column :users, :hr_zone3_bpm_min, :integer
    add_column :users, :hr_zone3_bpm_max, :integer
    add_column :users, :hr_zone4_bpm_min, :integer
    add_column :users, :hr_zone4_bpm_max, :integer
  end
end
