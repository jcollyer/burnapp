module ApplicationHelper
  def HHMMSS(t)
    Time.at(t).utc.strftime("%H:%M:%S")
  end
end
