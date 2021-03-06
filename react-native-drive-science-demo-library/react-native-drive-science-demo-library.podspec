require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-drive-science-demo-library"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-drive-science-demo-library
                   DESC
  s.homepage     = "https://github.com/github_account/react-native-drive-science-demo-library"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "Your Name" => "yourname@email.com" }
  s.platforms    = { :ios => "10.0", :tvos => "10.0" }
  s.source       = { :git => "https://github.com/github_account/react-native-drive-science-demo-library.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"

  if ENV["USE_LOCAL_ROOT_TRIP_TRACKER_POD"] == "true"
    s.dependency "RootTripTrackerSource"
  else
    s.dependency "RootTripTracker", "20200922.1.0"
  end
  # s.dependency "..."
end

